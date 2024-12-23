import toast, { Toaster } from 'react-hot-toast';



export const LoadMessage = () => {
  const toastId = toast.loading('Loading...');
   return toastId;
   
};

export const CloseLoad = (toastId) => {
    return toast.dismiss(toastId);
    
 };
 
 