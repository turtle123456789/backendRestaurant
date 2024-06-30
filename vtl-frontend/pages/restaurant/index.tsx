import PageContainer from "@/components/container/PageContainer";
import DetailRestaurant from "@/components/restaurant/DetailRestaurant";
import DetailLayout from "@/layouts/detail/DetailLayout";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { useRouter } from "next/router";
export default function Restaurant() {
  const router = useRouter();
  const { restaurantId } = router.query as { restaurantId: string }; 
  
  return (
    <PageContainer title="restaurant">
      <DetailRestaurant />
    </PageContainer>
  );
}

Restaurant.getLayout = function getLayout(page: ReactElement) {
  return <DetailLayout>{page}</DetailLayout>;
}; // Path: pages/restaurants/index.tsx
