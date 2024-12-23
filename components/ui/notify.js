import toast, { Toaster } from 'react-hot-toast';



const Notify = (message) => {
   return toast.success(message);
   
};

export default Notify