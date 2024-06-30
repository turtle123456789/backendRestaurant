import CreateCategoryComponent from "@/components/admin/manage-category/create/CreateCategory";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";

export default function CreateCategory() {
  return (
    <PageContainer title="Create Category">
      <CreateCategoryComponent />
    </PageContainer>
  );
}

CreateCategory.getLayout = function getLayout(page: any) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
