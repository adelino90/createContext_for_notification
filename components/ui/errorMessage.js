import toast, { Toaster } from 'react-hot-toast';



const Error = (message) => {
   return toast.error(message);
   
};

export default Error