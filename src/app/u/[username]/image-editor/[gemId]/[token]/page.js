import ImageEditor                  from "@containers/image-editor";

export const metadata = {
    title: 'Image Editor | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const ImageEditorPage = () => {
    return (<ImageEditor />);
}
 
export default ImageEditorPage;