import { ChangeEvent, useEffect, useState } from "react";
import { CrossCircleSVG, Spinner, Tag } from "@ensdomains/thorin";
import { HomepageBg } from "@/components/01-atoms";
import { isNameAvailable } from "@/lib/name-registration/blockchain-txs";
import { ENSName, buildENSName } from "@namehash/ens-utils";
import { DebounceInput } from "react-debounce-input";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (!domain) return;

    setIsAvailable(null);

    let ensName: null | ENSName = null;
    try {
      ensName = buildENSName(domain);
    } catch (error) {
      console.error(error);
      setIsAvailable(false);
      return;
    }

    isNameAvailable(ensName)
      .then((isAvailable: boolean) => {
        setIsAvailable(isAvailable);
      })
      .catch(() => {
        setIsAvailable(false);
      });
  }, [domain]);

  const clearDomainSearch = () => {
    setDomain("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const goToRegisterPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && domain) {
      router.push(`/register/${domain}`);
    }
  };

  return (
    <div className="flex relative h-screen flex-col items-center justify-center bg-white p-4 overflow-clip">
      <HomepageBg />

      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-y-8 -translate-y-1/3">
        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-gray-200">
          <p>🔎</p>
          <p className="text-black">Search domains</p>
        </div>
        <div className="text-center">
          <h1 className="font-medium text-[36px] pb-2 text-[#1E2122] leading-[48px]">
            Simplify your <span className="text-gradient-ens">web3 domain</span>{" "}
            registration
          </h1>
          <p className="text-gray-500 text-[20px] font-normal">
            Type in your desired domain and see what&apos;s available.
          </p>
        </div>

        {/* Input  */}
        <div className="w-full h-[52px] relative max-w-[470px] ">
          <div className="absolute top-0 left-0 w-full border border-gray-200 rounded-xl">
            <div className="flex w-full justify-center items-center p-2 pl-5">
              <DebounceInput
                minLength={3}
                value={domain}
                debounceTimeout={300}
                onChange={handleInputChange}
                onKeyDown={(e) => goToRegisterPage(e)}
                className="w-full py-2 text-black"
                placeholder="Search for a domain"
              />

              <div className="flex items-center justify-center gap-2">
                {!!domain && (
                  <button
                    className="h-full p-2 hover:-translate-y-[1px] transition-all duration-200"
                    onClick={clearDomainSearch}
                  >
                    <CrossCircleSVG className="text-gray-400 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                domain
                  ? "opacity-100 visible h-[52px]"
                  : " opacity-0 invisible h-0"
              }`}
            >
              <div className="flex w-full justify-between items-center border-gray-200 border-t p-4 pl-5 ">
                <p className="text-gray-500 min-h-6">
                  {domain ? (
                    domain.includes(".eth") ? (
                      domain
                    ) : (
                      `${domain}.eth`
                    )
                  ) : (
                    <span />
                  )}
                </p>

                {isAvailable === null ? (
                  <Spinner color="blue" />
                ) : isAvailable ? (
                  <Tag colorStyle="greenSecondary" size="small">
                    Available
                  </Tag>
                ) : (
                  <Tag colorStyle="blueSecondary" size="small">
                    Registered
                  </Tag>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[85%] h-[243px] blur-[125px] bg-gradient-ens absolute bottom-[-200px] rounded-ellipse"></div>
    </div>
  );
}