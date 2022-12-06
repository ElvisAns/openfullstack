import { useEffect } from 'react'

const Notification = (props) => {

    const message = props.notification.message

    const error = props.notification.error

    const style_error = {
        color: "white",
        backgroundColor: "red",
        padding: "4px 10px",
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        minWidth: '250px',
        borderRadius: '10px'

    }

    const style_success = {
        color: "white",
        backgroundColor: "green",
        padding: "4px 10px",
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        minWidth: '250px',
        borderRadius: '10px',
    }

    const closeButtonStyle = {
        position: 'absolute',
        right: '0px',
        top: '0px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '10px',
        cursor: 'pointer'
    }

    useEffect(() => {
        console.log("in Effect")
        setTimeout(() => {
            props.notificationStateSetter({
                message: '',
                error: false
            })
        }, 5000)
    },[props])


    if (message && !error) {
        return (
            <div style={style_success}>
                <p>{message}</p>
                <button style={closeButtonStyle} onClick={() =>
                    props.notificationStateSetter({
                        message: '',
                        error: false
                    })}>x</button>
            </div>
        )
    }

    else if (message && error) {
        return (
            <div style={style_error}>
                <p>{message}</p>
                <button style={closeButtonStyle} onClick={() =>
                    props.notificationStateSetter({
                        message: '',
                        error: false
                    })}>x</button>
            </div>
        )
    }

    else {
        return (
            null
        )
    }
}

export default Notification