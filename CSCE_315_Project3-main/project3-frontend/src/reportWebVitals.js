const reportWebVitals = onPerfEntry => { //this is a function that takes in a function as a parameter
  if (onPerfEntry && onPerfEntry instanceof Function) { //if the parameter is a function
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { //import web-vitals
      getCLS(onPerfEntry); //get the cumulative layout shift
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals; //export the function
