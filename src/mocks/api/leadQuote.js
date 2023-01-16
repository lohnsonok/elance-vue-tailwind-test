const postLeadQuote = (data) => new Promise((resolve) => {
  setTimeout(() => {
    // reject if the data is invalid
    if (!data || !data.firstName || !data.lastName || !data.email) {
      resolve({
        status: 400,
        data: {
          message: 'Invalid data',
        },
      });

      return;
    }

    // reject if no internet connection with request failure
    if (!navigator.onLine) {
      resolve({
        status: 500,
        data: {
          message: 'Request failed',
        },
      });
      return;
    }

    // resolve with the data
    resolve({
      success: true,
      data: {
        ...data,
      },
    });
  }, 5000);
});

export default postLeadQuote;
