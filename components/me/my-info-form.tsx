import Input from "../input";

interface MyInfoFormPropsType {
  id: string;
  name: string;
  title: string;
  currentData: string;
}

export default function MyInfoForm({
  id,
  name,
  title,
  currentData,
}: MyInfoFormPropsType) {
  return (
    <div className="flex flex-col font-notoKr rounded-md aspect-auto bg-slate-100">
      <h2 className="font-semibold text-medium p-3">{title}</h2>
      <div className="flex flex-col p-3">
        <Input disabled value={currentData} id={id} name={name} />
      </div>
    </div>
  );
}
