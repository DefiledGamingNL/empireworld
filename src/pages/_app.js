import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import React from 'react'
import App from 'next/app'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import store, {persistor} from '@/store/store'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons'

library.add(fas, faMars, faVenus)

class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        )
    }
}

export default MyApp