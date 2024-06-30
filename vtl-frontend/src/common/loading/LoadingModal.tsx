import React from 'react';
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

const LoadingModal = ({ open }: { open: boolean }) => {
    return (
        <Dialog open={open} aria-labelledby="loading-dialog">
            <DialogContent style={{ display: 'flex', justifyContent: 'center', padding: '24px', backgroundColor: "transparent" }}>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
};

export default LoadingModal;