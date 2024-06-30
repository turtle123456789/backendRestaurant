import ListCategory from "@/components/admin/manage-category/list-category/ListCategory";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";

export default function AllCategory() {
  return (
    <PageContainer title="All Categories">
      <ListCategory />
    </PageContainer>
  );
}

AllCategory.getLayout = function getLayout(page: any) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
