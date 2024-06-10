import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  PencilIcon,
  TwitterIcon,
} from "@/components/01-atoms";
import {
  AccountsTab,
  AddressesTab,
  OthersTab,
  ProfileTab,
  FieldsProvider,
  Tab,
  ProfileRecordItem,
} from "@/components/02-molecules";
import CustomImage from "@/components/02-molecules/CustomImage";
import { EditModalContent } from "@/components/organisms/EditModalContent";
import { formatDate, formatHexAddress, getENS } from "@/lib/utils/ens";

import {
  Button,
  CalendarSVG,
  CogSVG,
  CopySVG,
  EthTransparentSVG,
  HeartSVG,
  InfoCircleSVG,
  LeftChevronSVG,
  Modal,
  Skeleton,
  SkeletonGroup,
  Toggle,
} from "@ensdomains/thorin";
import Link from "next/link";
import { useEffect, useState } from "react";

const tabComponents: Record<Tab, React.FC> = {
  [Tab.Profile]: ProfileTab,
  [Tab.Accounts]: AccountsTab,
  [Tab.Addresses]: AddressesTab,
  [Tab.Others]: OthersTab,
};

export function ManageNamePageContent({ name }: { name: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [ensData, setEnsData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchENS = async () => {
    try {
      const data = await getENS(name);
      setEnsData(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setEnsData(null);
    }
  };

  useEffect(() => {
    handleFetchENS();
  }, []);

  return (
    <div className="text-black flex flex-col items-center justify-start bg-white">
      <div className="w-full border-b border-gray-200 py-4 px-[60px] flex items-start">
        <div className="w-full max-w-[1216px] flex mx-auto">
          <Link
            href="/manage"
            className="flex items-center justify-center flex-shrink text-gray-400 hover:text-black duration-300 transition-colors gap-2"
          >
            <LeftChevronSVG /> <p className="text-black">Back</p>
          </Link>
        </div>
      </div>
      <SkeletonGroup loading={!ensData}>
        <div className="w-full p-[60px]">
          <div className="w-full max-w-[1216px] mx-auto flex flex-col gap-7">
            <div className="w-full flex gap-[60px]">
              <Skeleton>
                <div className="w-[376px] flex flex-col rounded-md overflow-hidden border border-gray-200 ">
                  <div className="h-[120px] w-full bg-gradient-ens" />

                  <div className="w-full px-6 pb-6 flex flex-col gap-5">
                    <div className="h-[56px] items-end w-full flex justify-between">
                      {ensData?.textRecords?.avatar ? (
                        <CustomImage
                          alt="avatar image"
                          width={100}
                          height={100}
                          src={ensData?.textRecords?.avatar}
                          className="w-[100px] h-[100px] border-4 border-white rounded-[10px]"
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] border-4 bg-gradient-ens border-white rounded-[10px]" />
                      )}

                      <div>
                        <Button
                          onClick={() => {
                            setModalOpen(true);
                          }}
                          size="small"
                          prefix={<PencilIcon />}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <Skeleton>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[26px]">{name}</h3>
                          <CopySVG className="text-gray-400 cursor-pointer hover:text-black transition-colors duration-300" />
                        </div>
                        {ensData?.textRecords?.url && (
                          <a
                            href={ensData.textRecords.url}
                            target="_blank"
                            className="text-[16px] text-blue-500"
                          >
                            {ensData.textRecords.url}
                          </a>
                        )}
                      </Skeleton>
                    </div>
                    <Skeleton>
                      <p className="text-base text-gray-400">
                        {ensData?.textRecords?.description}
                      </p>
                    </Skeleton>
                    <Skeleton>
                      <div className="flex items-center justify-center gap-2 p-3 rounded-md border border-gray-200">
                        <Toggle />
                        <p>Primary name</p>
                        <InfoCircleSVG className="text-gray-400 h-4 w-4 mr-1" />
                      </div>
                    </Skeleton>
                    <div className="flex flex-col items-start justify-center gap-1">
                      {ensData?.textRecords?.["email"] && (
                        <Link
                          target="_blank"
                          href={`mailto:${ensData?.textRecords?.["email"]}`}
                          className="p-2 flex gap-2 group"
                        >
                          <EmailIcon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-200" />
                          <h3 className="text-gray-400 group-hover:text-black transition-colors duration-300">
                            {ensData?.textRecords?.["email"]}
                          </h3>
                        </Link>
                      )}

                      {!!ensData?.textRecords?.["com.github"] && (
                        <Link
                          target="_blank"
                          href={`https://github.com/${ensData?.textRecords["com.github"]}`}
                          className="p-2 flex gap-2 group"
                        >
                          <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-200" />
                          <h3 className="text-gray-400 group-hover:text-black transition-colors duration-300">
                            {ensData?.textRecords?.["com.github"]}
                          </h3>
                        </Link>
                      )}

                      {ensData?.textRecords?.["com.twitter"] && (
                        <Link
                          target="_blank"
                          href={`https://x.com/${ensData?.textRecords["com.twitter"]}`}
                          className="p-2 flex gap-2 group"
                        >
                          <TwitterIcon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-200" />
                          <h3 className="text-gray-400 group-hover:text-black transition-colors duration-300">
                            {ensData?.textRecords?.["com.twitter"]}
                          </h3>
                        </Link>
                      )}

                      {ensData?.textRecords?.["com.linkedin"] && (
                        <Link
                          target="_blank"
                          href={`https://www.linkedin.com/in/${ensData?.textRecords["com.linkedin"]}`}
                          className="p-2"
                        >
                          <LinkedInIcon className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Skeleton>

              <div className="flex-grow flex gap-11 flex-col">
                <div className="flex flex-col gap-4">
                  <Skeleton>
                    <h3 className="font-semibold text-base">Addresses</h3>
                  </Skeleton>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton>
                      <ProfileRecordItem
                        icon={EthTransparentSVG}
                        text={formatHexAddress(ensData?.address)}
                      />
                    </Skeleton>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Skeleton>
                    <h3 className="font-semibold text-base">Ownership</h3>
                  </Skeleton>

                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton>
                      <ProfileRecordItem
                        icon={CogSVG}
                        label="manager"
                        text={formatHexAddress(ensData?.ownerId)}
                      />
                    </Skeleton>

                    <Skeleton>
                      <ProfileRecordItem
                        icon={HeartSVG}
                        label="owner"
                        text={formatHexAddress(ensData?.ownerId)}
                      />
                    </Skeleton>

                    <Skeleton>
                      <ProfileRecordItem
                        icon={CalendarSVG}
                        label="expiry"
                        text={formatDate({
                          unixTimestamp: parseInt(ensData?.expiryDate),
                        })}
                      />
                    </Skeleton>
                    <Skeleton>
                      <ProfileRecordItem
                        icon={EthTransparentSVG}
                        label="parent"
                        text={ensData?.parentName}
                      />
                    </Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonGroup>
      <Modal open={modalOpen} onDismiss={() => {}}>
        <EditModalContent
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { name: string };
}) {
  return {
    props: {
      name: params.name,
    },
  };
}

export default function ManageNamePage({ name }: { name: string }) {
  return (
    <FieldsProvider>
      <ManageNamePageContent name={name} />
    </FieldsProvider>
  );
}
