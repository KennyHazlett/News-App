// reportWebVitals is a function that helps measure the performance of the application
// by collecting several important Web Vitals metrics.
const reportWebVitals = onPerfEntry => {
  // Check if the passed argument (onPerfEntry) is a valid function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Collect and report the various Web Vitals metrics
      // Cumulative Layout Shift (CLS)
      getCLS(onPerfEntry);
      // First Input Delay (FID)
      getFID(onPerfEntry);
      // First Contentful Paint (FCP)
      getFCP(onPerfEntry);
      // Largest Contentful Paint (LCP)
      getLCP(onPerfEntry);
      // Time to First Byte (TTFB)
      getTTFB(onPerfEntry);
    });
  }
};

// Export the reportWebVitals function
export default reportWebVitals;
