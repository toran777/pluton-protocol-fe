import React from 'react';
import ReactDOM from 'react-dom';
import 'app/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'app/App';
import {getChainOptions, WalletProvider} from '@terra-money/wallet-provider';
import {createTheme, ThemeProvider} from "@mui/material";

getChainOptions().then((chainOptions) => {
    const theme = createTheme({
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            button: {
                textTransform: 'none'
            }
        }
    })

    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <WalletProvider {...chainOptions}>
                <App/>
            </WalletProvider>
        </ThemeProvider>,
        document.getElementById('root'),
    );
});
