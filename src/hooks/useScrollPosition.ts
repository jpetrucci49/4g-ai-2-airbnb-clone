"use client";

import { useSyncExternalStore } from "react";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY;
}

function getScrollServerSnapshot() {
  return 0;
}

export function useScrollPosition() {
  return useSyncExternalStore(subscribeScroll, getScrollSnapshot, getScrollServerSnapshot);
}

type CollapsedStore = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => boolean;
  getServerSnapshot: () => boolean;
};

const collapsedStores = new Map<string, CollapsedStore>();

function getCollapsedStore(collapseAt: number, expandAt: number): CollapsedStore {
  const key = `${collapseAt}:${expandAt}`;
  const existing = collapsedStores.get(key);
  if (existing) return existing;

  let collapsed = false;

  const store: CollapsedStore = {
    getSnapshot: () => collapsed,
    getServerSnapshot: () => false,
    subscribe: (callback) => {
      const onScroll = () => {
        const scrollY = window.scrollY;
        const next =
          !collapsed && scrollY > collapseAt
            ? true
            : collapsed && scrollY < expandAt
              ? false
              : collapsed;

        if (next !== collapsed) {
          collapsed = next;
          callback();
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    },
  };

  collapsedStores.set(key, store);
  return store;
}

/**
 * Hysteresis scroll flag to avoid layout-shift feedback loops.
 * Collapses after scrolling past `collapseAt`; only expands again near the top.
 */
export function useScrollCollapsed(collapseAt: number, expandAt = 16) {
  const store = getCollapsedStore(collapseAt, expandAt);
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}
