import { Suspense, useState } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { themes } from "prism-react-renderer";
import { FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import React from "react";
import ReactNavigableList from "react-navigable-list";
import ReactDOM from "react-dom/client";

const CustomCodePreview = ({
  jsCode,
  tsCode,
  scope,
}: {
  jsCode: string;
  tsCode: string;
  scope?: any;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [JsOrTs, setJsOrTs] = useState<"js" | "ts">("js");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JsOrTs === "js" ? jsCode : tsCode);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <Suspense fallback={<>Loading...</>}>
      <LiveProvider
        code={JsOrTs === "js" ? jsCode : tsCode}
        noInline
        theme={themes.dracula}
        scope={{
          React,
          ReactDOM,
          ReactNavigableList,
        }}
      >
        <div className="flex flex-col">
          {/* Live Preview */}
          <LivePreview className="flex justify-center p-4 border border-[#3d4751cc] rounded-t" />

          {/* Toggle JS/TS and Copy */}
          <div className="flex justify-between items-center px-4 h-14 border-x border-b border-[#3d4751cc] !mt-0">
            {/* Toggle JS/TS */}
            <div className="flex rounded-full">
              <span
                onClick={() => setJsOrTs("js")}
                className={`py-1 px-4 cursor-pointer rounded-l-full border border-gray-600 hover:border-gray-500 ${
                  JsOrTs === "js" ? "bg-gray-600 text-white" : ""
                }`}
              >
                JS
              </span>
              <span
                onClick={() => setJsOrTs("ts")}
                className={`py-1 px-4 cursor-pointer rounded-r-full border border-gray-600 hover:border-gray-500 ${
                  JsOrTs === "ts" ? "bg-gray-600 text-white" : ""
                }`}
              >
                TS
              </span>
            </div>

            <div className="flex gap-x-4 items-center !mt-0">
              {/* Copy Button */}
              <button
                title="Copy code"
                onClick={handleCopy}
                className="text-gray-400 hover:cursor-pointer hover:opacity-90 !mt-0 !bg-transparent"
              >
                <FaCopy size="30" />
              </button>

              {/* Collapse/Expand Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-400 hover:cursor-pointer hover:opacity-90 !mt-0 p-2 !bg-transparent"
              >
                {isCollapsed ? (
                  <FaChevronDown size="20" />
                ) : (
                  <FaChevronUp size="20" />
                )}
              </button>
            </div>
          </div>

          {/* Code Editor with Animation */}
          <div
            className={`transition-all duration-300 overflow-auto !mt-0 ${
              isCollapsed ? "max-h-0" : "max-h-[600px]"
            }`}
          >
            <LiveEditor className="font-mono text-white border border-[#3d4751cc] rounded-b" />
          </div>

          {/* Error Display */}
          <LiveError className="text-red-800 bg-red-100 p-2 rounded" />
        </div>
      </LiveProvider>
    </Suspense>
  );
};

export default CustomCodePreview;
