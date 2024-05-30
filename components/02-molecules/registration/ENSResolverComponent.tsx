import {
  ArbitrumIcon,
  BackButton,
  DatabaseIcon,
  EthIcon,
  NextButton,
  OptimismIcon,
} from "@/components/01-atoms";
import ExternalLinkIcon from "@/components/01-atoms/icons/external-link";
import { EnsResolver } from "@/lib/name-registration/constants";
import { useNameRegistration } from "@/lib/name-registration/useNameRegistration";
import { RadioButton, Typography } from "@ensdomains/thorin";
import { useRef } from "react";

interface ENSResolverComponentProps {
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

export function ENSResolverComponent({
  handlePreviousStep,
  handleNextStep,
}: ENSResolverComponentProps) {
  const radioButtonRefMainnet = useRef(null);
  const radioButtonRefDatabase = useRef(null);
  const radioButtonRefArbitrum = useRef(null);
  const radioButtonRefOptimism = useRef(null);

  const { nameRegistrationData, setEnsResolver } = useNameRegistration();

  const { ensResolver } = nameRegistrationData;

  const handleENSResolverSelection = (
    radioRef: React.RefObject<HTMLInputElement>
  ) => {
    radioRef?.current?.click();
  };

  return (
    <div className="flex flex-col gap-[44px] justify-start items-start">
      <BackButton onClick={handlePreviousStep} />

      <div className="max-w-[500px] w-full flex items-start flex-col gap-7">
        <div className="flex flex-col gap-3">
          <h3 className="text-start text-[34px] font-medium">
            Where do you want to store the domain data?
          </h3>
          <div className="flex gap-2">
            <Typography className="text-start" fontVariant="small">
              What are the differences?
            </Typography>
            <a
              target="_blank"
              href="https://docs.ens.domains/resolvers/quickstart"
              className="flex items-center justify-center gap-1"
            >
              <ExternalLinkIcon className="w-3 h-3" />
              <p className="text-blue-500 text-sm">Learn more</p>
            </a>
          </div>
        </div>

        <div className="flex flex-col border rounded-[8px] border-gray-200 w-full">
          <div
            onClick={() => handleENSResolverSelection(radioButtonRefMainnet)}
            className="flex cursor-pointer items-center gap-4 p-3 border-b border-gray-200"
          >
            <div>
              <RadioButton
                checked={ensResolver === EnsResolver.Mainnet}
                onChange={() => {
                  setEnsResolver(EnsResolver.Mainnet);
                }}
                ref={radioButtonRefMainnet}
                label=""
                name="RadioButtonGroup"
                value="10"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <EthIcon className="h-6 w-6" />
              Mainnet
            </div>
          </div>
          <div
            onClick={() => handleENSResolverSelection(radioButtonRefDatabase)}
            className="flex cursor-pointer items-center gap-4 p-3 border-b border-gray-200"
          >
            <div>
              <RadioButton
                checked={ensResolver === EnsResolver.Database}
                onChange={() => {
                  setEnsResolver(EnsResolver.Database);
                }}
                ref={radioButtonRefDatabase}
                label=""
                name="RadioButtonGroup"
                value="10"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <DatabaseIcon className="h-6 w-6" />
              Centralized Database
            </div>
          </div>

          <button
            onClick={() => handleENSResolverSelection(radioButtonRefArbitrum)}
            className="flex cursor-pointer items-center gap-4 p-3 border-b border-gray-200"
          >
            <div>
              <RadioButton
                checked={ensResolver === EnsResolver.Arbitrum}
                onChange={() => {
                  setEnsResolver(EnsResolver.Arbitrum);
                }}
                ref={radioButtonRefArbitrum}
                label=""
                name="RadioButtonGroup"
                value="10"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <ArbitrumIcon className="h-6 w-6" />
              Arbitrum
            </div>
          </button>

          <div
            onClick={() => handleENSResolverSelection(radioButtonRefOptimism)}
            className="flex cursor-pointer items-center gap-4 p-3"
          >
            <div>
              <RadioButton
                checked={ensResolver === EnsResolver.Optimism}
                onChange={() => {
                  setEnsResolver(EnsResolver.Optimism);
                }}
                ref={radioButtonRefOptimism}
                label=""
                name="RadioButtonGroup"
                value="10"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <OptimismIcon className="h-6 w-6" />
              Optimism
            </div>
          </div>
        </div>
      </div>

      <NextButton disabled={ensResolver === null} onClick={handleNextStep} />
    </div>
  );
}
