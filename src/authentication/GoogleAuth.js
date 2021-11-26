import * as React from 'react';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();


export default function GoogleAuth() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <p>Signing in with Google...</p>
        </div>
    );
}