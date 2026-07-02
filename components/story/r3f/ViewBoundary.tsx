"use client";

import { Component, type ReactNode } from "react";

// Isolates a single scene's 3D so a failure (e.g. a model that won't load)
// can never blank the shared canvas for every other scene.
export default class ViewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[story] a 3D scene failed to render:", error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
