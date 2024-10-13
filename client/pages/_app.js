import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loading from '@/components/Loading';
import axios from 'axios';

export default function App({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("id");

    axios.interceptors.request.use(function (config) {
      if (!config.DISABLE_LOADING) {
        setLoading(true);
      }

      config.headers.Authorization = `Bearer ${user_id}`;
      return config;
    });

    axios.interceptors.response.use(
      function (response) {
        if (response && response.data && response.data.message) {
          toast.success(response.data.message);
        }
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error && error.response && error.response.data) {
          toast.error(
            error.response.data.message ||
            (typeof error.response.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response.data))
          );
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Component {...pageProps} setLoading={setLoading} />
      <ToastContainer 
        position='bottom-right' 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme='light' 
      />
    </>
  );
}
