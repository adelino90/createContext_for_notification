import  {createContext,useState,useEffect} from 'react'

const NotificationContext = createContext({
    notification:null,
    showNotification:function(notificationData){},
    hideNotification:function(){}
});


export function NotificationContextProvider(props){
    const [activenotification, setActiveNotification] = useState();
    useEffect(()=>{
        if((activenotification && activenotification.status === 'success' )|| (activenotification && activenotification.status === 'error' )){
            const timer = setTimeout(()=>{
                setActiveNotification(null)
            },3000)
            return ()=>{
                clearTimeout(timer)
            }
        }
    },[activenotification])

    function showNotificationHandler(notificationData){
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler(){
        setActiveNotification(null)
    }

    const context = { notification:activenotification, showNotification:showNotificationHandler, hideNotification:hideNotificationHandler}
    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationContext;