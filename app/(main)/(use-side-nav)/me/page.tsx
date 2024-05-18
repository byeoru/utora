import {
  editMyAgeGroup,
  editMyGender,
  editMyNickname,
  getMyInfo,
} from "./actions";
import AlertLogoutComponent from "@/components/alert-logout-component";
import DeleteAccountButton from "@/components/delete-account-button";
import LogoutButton from "@/components/logout-button";
import EditMyInfoForm from "@/components/me/edit-my-info-form";
import EditMyInfoSelect from "@/components/me/edit-my-info-select";
import EditMyPassword from "@/components/me/edit-my-password";
import MyInfoForm from "@/components/me/my-info-form";
import { ageGroups, genders } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 정보",
};

export default async function Me() {
  const myInfo = await getMyInfo();
  return (
    <>
      {!myInfo ? (
        <AlertLogoutComponent text="유저 정보가 존재하지 않습니다." />
      ) : null}
      <div className="w-full max-w-screen-lg gap-10 p-2 md:p-5 flex flex-col m-auto">
        <h1 className="font-semibold text-xl">내 정보</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <MyInfoForm
            id="my_email"
            name="my_email"
            title="이메일"
            currentData={myInfo?.email ?? "[error]"}
          />
          {myInfo && myInfo.gender ? (
            <MyInfoForm
              id="my_gender"
              name="my_gender"
              title="성별"
              currentData={genders[myInfo.gender]}
            />
          ) : null}
          <EditMyInfoForm
            title="닉네임"
            formName="nickname"
            currentData={myInfo?.nickname ?? "[error]"}
            editFn={editMyNickname}
          />
          <EditMyInfoSelect
            title="연령층"
            formName="ageGroup"
            currentData={
              myInfo?.age_group ? ageGroups[myInfo.age_group] : "[error]"
            }
            optionsObj={ageGroups}
            editFn={editMyAgeGroup}
            confirmFinal={false}
          />
          {myInfo && !myInfo.gender ? (
            <EditMyInfoSelect
              title="성별"
              formName="gender"
              currentData={myInfo?.gender ? genders[myInfo.gender] : "[error]"}
              optionsObj={genders}
              editFn={editMyGender}
              buttonText="저장"
              confirmFinal={true}
            />
          ) : null}
          <EditMyPassword />
        </div>
        <div className="flex gap-5 pl-5 pb-5">
          <LogoutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </>
  );
}
