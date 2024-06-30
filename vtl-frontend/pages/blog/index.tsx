import BlogComponent from "@/components/blog/Blog";
import PageContainer from "@/components/container/PageContainer";
import FullLayout from "@/layouts/full/FullLayout";
import { ReactElement } from "react";

export default function Blog() {
    return (
        <PageContainer title="Blog">
            <BlogComponent />
        </PageContainer>
    )
}

Blog.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};