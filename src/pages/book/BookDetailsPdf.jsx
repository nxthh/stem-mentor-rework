import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExpand,
  FaCompress,
  FaDownload,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function BookDetailsPdf({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(null);
  const viewerRef = useRef(null);
  const pdfContainerRef = useRef(null);

  const isFullScreen = document.fullscreenElement === viewerRef.current;

  const safeFileUrl = fileUrl?.startsWith("http://")
    ? fileUrl.replace("http://", "https://")
    : fileUrl;

  useEffect(() => {
    const updateContainerWidth = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.offsetWidth - 20);
      }
    };
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [isFullScreen]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const goPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      viewerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = safeFileUrl;
    link.download = safeFileUrl.split("/").pop() || "document.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 flex flex-col items-center w-full max-w-4xl mx-auto p-4 md:p-0 ">
      <div className="flex justify-center items-center gap-2 mb-4 p-2 dark:bg-darkbg dark:border-0 bg-white rounded-lg border border-gray-100 w-full max-w-sm md:max-w-md flex-wrap">
        <button
          onClick={goPrevPage}
          disabled={pageNumber <= 1}
          title="Previous Page"
          className="p-3 text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <FaArrowLeft />
        </button>

        <span className="flex items-center gap-2 dark:text-white">
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1 && val <= numPages) setPageNumber(val);
            }}
            className="w-16 text-center border rounded-md px-2 py-1 dark:text-white text-gray-700"
          />
          <span className="text-gray-700 dark:text-white">
            / {numPages || 0}
          </span>
        </span>

        <button
          onClick={goNextPage}
          disabled={pageNumber >= numPages}
          title="Next Page"
          className="p-3 text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <FaArrowRight />
        </button>

        <button
          onClick={toggleFullScreen}
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          className="ml-4 p-3 text-base text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>

        <button
          onClick={handleDownload}
          title="Download PDF"
          className="ml-2 p-3 text-base text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <FaDownload />
        </button>
      </div>

      <div
        ref={viewerRef}
        className={`relative flex justify-center w-full overflow-hidden transition-all duration-300 ${
          isFullScreen
            ? "fixed top-0 left-0 h-screen z-50 pt-16 md:pt-20 bg-white"
            : "min-h-[500px] rounded-xl"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
            <ImSpinner2 className="animate-spin text-5xl text-blue-500" />
            <p className="mt-4 text-gray-700 font-medium">
              Loading document...
            </p>
          </div>
        )}

        <div
          ref={pdfContainerRef}
          className="p-2 overflow-y-auto max-h-full w-full flex justify-center rounded-md"
        >
          <Document
            file={safeFileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-auto "
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="mx-auto"
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
