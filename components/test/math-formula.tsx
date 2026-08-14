"use client";

import * as React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function MathFormula({ formula }: { formula: string }) {
  const html = React.useMemo(
    () =>
      katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true,
      }),
    [formula]
  );
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}