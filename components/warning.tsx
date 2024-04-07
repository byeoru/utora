interface ModalPropsType {
  title: string;
  content: string;
}

export default function Modal({ title, content }: ModalPropsType) {
  return (
    <div className="w-full h-full fixed flex justify-center items-center bg-black opacity-20">
      <div className="w-32 h-14 flex flex-col rounded-lg">
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
