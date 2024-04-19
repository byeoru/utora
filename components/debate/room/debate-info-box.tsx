import { Dot } from "lucide-react";
import Divider from "../../divider";

interface DebateInfoBoxPropsType {
  topicTitle: string;
  proposeReason: string;
  myNickname: string;
  debateRoleKr: string;
}

export default function DebateInfoBox({
  topicTitle,
  proposeReason,
  myNickname,
  debateRoleKr,
}: DebateInfoBoxPropsType) {
  return (
    <div className="w-full p-3 bg-slate-100 flex flex-col gap-2 shadow-md">
      <span className="text-base">
        <span className="font-jua ">토론 주제: </span>
        <span className="font-notoKr font-semibold text-gray-600">
          {topicTitle}
        </span>
      </span>
      <Divider />
      <span className="text-sm">
        <span className="font-jua">주제 제시 배경:</span>
        <p className="font-notoKr text-gray-600">{proposeReason}</p>
      </span>
      <span className="mt-3 text-sm font-notoKr flex items-center">
        <Dot className="text-green-500 size-7" />
        <span className="">
          {`${myNickname}님은 현재 `}
          <span className="text-violet-500 decoration-dotted underline underline-offset-2 font-semibold">
            {debateRoleKr}
          </span>
          <span>(으)로 참여중입니다</span>
        </span>
      </span>
    </div>
  );
}
