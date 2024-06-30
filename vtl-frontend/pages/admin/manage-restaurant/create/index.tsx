import type { ReactElement } from "react";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { Box } from "@mui/material";
import CreateRestaurant from "@/components/admin/manage-restaurant/create/CreateRestaurant";

export default function CreateRestaurantPage() {
    const handleClose = () => {
        // Xử lý đóng modal hoặc điều hướng sau khi tạo nhà hàng
        // Ví dụ: đóng modal hoặc chuyển hướng đến trang khác
    };

    return (
        <PageContainer title="Create Restaurant">
            <Box>
                <CreateRestaurant onClose={handleClose} />
            </Box>
        </PageContainer>
    );
    // return (
    //     <PageContainer title="Create Restaurant">
    //     <Box>
    //         <CreateRestaurant />
    //     </Box>
    //     </PageContainer>
    // );
}

CreateRestaurantPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminFullLayout>{page}</AdminFullLayout>;
};