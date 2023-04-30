import React, { useEffect, useState } from 'react';
import apiURL from '../config/apiURL';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function DownloadProjectsButton(props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [url]);

  function downloadProjects() {
    props.setLoading(true);
    const downloadAllProjectEndpoint = apiURL + '/download/projects';

    axios({
      url: downloadAllProjectEndpoint,
      method: 'GET',
      responseType: 'blob',
      headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data);
        setUrl(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'projects.xlsx';
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file', error);
      })
      .finally(() => {
        props.setLoading(false);
      });
  }

  return (
    <button
      type="button"
      onClick={downloadProjects}
      disabled={props.loading}
      className="download-button inline-flex items-center rounded-md px-2 sm:px-4 py-2 text-xs text-gray-800 shadow-sm hover:bg-purple-600"
    >
      <ArrowDownTrayIcon className="mr-2 h-5 w-5" aria-hidden="true" />
      Download as CSV
    </button>
  );
}

export default DownloadProjectsButton;
