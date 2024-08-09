import { BackButton, NextButton } from "@/components/01-atoms";
import { useEffect, useState } from "react";
import cc from "classcat";
import { useNameRegistration } from "@/lib/name-registration/useNameRegistration";
import { useAccount } from "wagmi";
import { setNameRegistrationInLocalStorage } from "@/lib/name-registration/localStorage";

interface SetTextRecordsBasicInfoComponentProps {
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

export enum BasicInfoKey {
  WEBSITE = "url",
  DESCRIPTION = "description",
}

export const SetTextRecordsBasicInfoComponent = ({
  handlePreviousStep,
  handleNextStep,
}: SetTextRecordsBasicInfoComponentProps) => {
  const [basicInfo, setBasicInfo] = useState({
    [BasicInfoKey.WEBSITE]: "",
    [BasicInfoKey.DESCRIPTION]: "",
  });

  const [hasErrorInKeyValues, setHasErrorInKeyValues] = useState({
    [BasicInfoKey.WEBSITE]: false,
    [BasicInfoKey.DESCRIPTION]: false,
  });
  const { address } = useAccount();
  const { setTextRecords, nameRegistrationData } = useNameRegistration();

  const validateForm = () => {
    let websiteIsValid = true;
    let descriptionIsValid = true;

    const websiteInfo = basicInfo[BasicInfoKey.WEBSITE];

    if (
      !!websiteInfo &&
      websiteInfo.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      ) === null
    ) {
      websiteIsValid = false;
    }

    setHasErrorInKeyValues({
      [BasicInfoKey.WEBSITE]: !websiteIsValid,
      [BasicInfoKey.DESCRIPTION]: false,
    });

    if (websiteIsValid && descriptionIsValid) {
      setTextRecords({
        ...nameRegistrationData.textRecords,
        [BasicInfoKey.WEBSITE]: basicInfo[BasicInfoKey.WEBSITE],
        [BasicInfoKey.DESCRIPTION]: basicInfo[BasicInfoKey.DESCRIPTION],
      });
      saveTextRecordsInLocalStorage({
        ...nameRegistrationData.textRecords,
        [BasicInfoKey.WEBSITE]: basicInfo[BasicInfoKey.WEBSITE],
        [BasicInfoKey.DESCRIPTION]: basicInfo[BasicInfoKey.DESCRIPTION],
      });
      handleNextStep();
    }
  };

  useEffect(() => {
    const basicInfoTextRecords = Object.values(BasicInfoKey).reduce(
      (acc, key) => ({
        ...acc,
        [key]: nameRegistrationData?.textRecords[key] || "",
      }),
      {}
    );
    setBasicInfo({ ...basicInfo, ...basicInfoTextRecords });
  }, []);

  const saveTextRecordsInLocalStorage = (
    textRecords: Record<string, string>
  ) => {
    if (address && nameRegistrationData.name) {
      setNameRegistrationInLocalStorage(address, nameRegistrationData.name, {
        textRecords,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-[44px] justify-start items-start">
      <BackButton onClick={handlePreviousStep} />
      <div className="max-w-[500px] w-full flex items-start flex-col gap-4 min-h-[300px]">
        <div>
          <p className="text-sm text-[#9b9ba7] font-bold text-start">
            Profile settings
          </p>
          <h1 className="text-[30px] text-[#1E2122] font-bold">Basic info</h1>
        </div>
        <form className="flex flex-col space-y-[22px] mb-[10px] w-full">
          {Object.values(BasicInfoKey).map((key) => (
            <div
              key={key}
              className="flex flex-col items-start space-y-2 w-full"
            >
              <label htmlFor={key} className="text-[#1E2122] text-sm">
                {key}
              </label>
              <input
                type="text"
                id={key}
                value={basicInfo[key as BasicInfoKey]}
                onChange={(e) =>
                  setBasicInfo({
                    ...basicInfo,
                    [key]: e.target.value,
                  })
                }
                className={cc([
                  "w-full p-3 border-[#e8e8e8] border-2 rounded-lg min-h-[37px] focus:border-blue-600 focus:border-2",
                  {
                    "border-red-400": hasErrorInKeyValues[key as BasicInfoKey],
                  },
                ])}
              />
            </div>
          ))}
        </form>
      </div>
      <div className="w-[500px] flex">
        <NextButton onClick={validateForm} />
      </div>
    </div>
  );
};
