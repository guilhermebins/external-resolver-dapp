import { Field, FieldType, Tab } from "@/types/editFieldsTypes";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { isAddress } from "viem";
import _ from "lodash";
import { ResolvedEnsData, TextRecords } from "@/lib/utils/ensData";
import { DecodedAddr } from "@ensdomains/ensjs/dist/types/types";

interface FieldsContextType {
  profileFields: Field[];
  initialProfileFields: Field[];
  accountsFields: Field[];
  initialAccountsFields: Field[];
  addressesFields: Field[];
  initialAddressesFields: Field[];
  addField: (tab: Tab, fieldName: string) => void;
  setFields: (tab: Tab, fields: Field[]) => void;
  setInitialFields: (tab: Tab, fields: Field[]) => void;
  updateField: (tab: Tab, index: number, newValue: string) => void;
  domainAddressesToUpdate: Record<string, string>;
  textRecordsToUpdate: Record<string, string>;
  updateFieldsWithEnsData: (ensData: ResolvedEnsData | null) => void;
}

interface FieldsProviderProps {
  children: ReactNode;
}

const FieldsContext = createContext<FieldsContextType | undefined>(undefined);

const FieldsProvider: React.FC<FieldsProviderProps> = ({ children }) => {
  const [textRecordsToUpdate, setTextRecordsToUpdate] = useState<
    Record<string, string>
  >({});
  const [domainAddressesToUpdate, setDomainAddressesToUpdate] = useState<
    Record<string, string>
  >({});

  // PROFILE TAB
  const [profileFields, setProfileFieldsState] = useState<Field[]>([
    {
      label: "url",
      placeholder: "https://coolcats.com",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "description",
      placeholder: "Share your story…",
      value: "",
      fieldType: FieldType.Text,
    },
  ]);

  const setFields = (tab: Tab, fields: Field[]) => {
    const setStateByTab = {
      [Tab.Profile]: setProfileFieldsState,
      [Tab.Accounts]: setAccountsFieldsState,
      [Tab.Addresses]: setAddressesFieldsState,
    };
    const deepCopiedFields = _.cloneDeep(fields);
    setStateByTab[tab](deepCopiedFields);
  };

  const updateField = (tab: Tab, index: number, newValue: string) => {
    const fieldsByTab = {
      [Tab.Profile]: [...profileFields],
      [Tab.Accounts]: [...accountsFields],
      [Tab.Addresses]: [...addressesFields],
    };
    const setStateByTab = {
      [Tab.Profile]: setProfileFieldsState,
      [Tab.Accounts]: setAccountsFieldsState,
      [Tab.Addresses]: setAddressesFieldsState,
    };
    const updatedFields = fieldsByTab[tab];
    updatedFields[index].value = newValue;

    if (updatedFields[index].fieldType === FieldType.Address) {
      setDomainAddressesToUpdate({
        ...domainAddressesToUpdate,
        [updatedFields[index].label]: newValue,
      });
    } else if (updatedFields[index].fieldType === FieldType.Text) {
      setTextRecordsToUpdate({
        ...textRecordsToUpdate,
        [updatedFields[index].label]: newValue,
      });
    }
    setStateByTab[tab](updatedFields);
  };

  const addField = (tab: Tab, fieldName: string) => {
    const setStateByTab = {
      [Tab.Profile]: setProfileFieldsState,
      [Tab.Accounts]: setAccountsFieldsState,
      [Tab.Addresses]: setAddressesFieldsState,
    };
    const newField: Field = {
      label: fieldName,
      placeholder: "",
      value: "",
      fieldType: FieldType.Text,
    };
    setStateByTab[tab]((prevFields) => [...prevFields, newField]);
  };

  // INITIAL PROFILE STATE
  const [initialProfileFields, setInitialProfileFieldsState] = useState<
    Field[]
  >([
    {
      label: "url",
      placeholder: "https://coolcats.com",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "description",
      placeholder: "Share your story…",
      value: "",
      fieldType: FieldType.Text,
    },
  ]);

  const setInitialFields = (tab: Tab, fields: Field[]) => {
    const setInitialFieldsByTab = {
      [Tab.Profile]: setInitialProfileFieldsState,
      [Tab.Accounts]: setInitialAccountsFieldsState,
      [Tab.Addresses]: setInitialAddressesFieldsState,
    };
    const deepCopiedFields = _.cloneDeep(fields);
    setInitialFieldsByTab[tab](deepCopiedFields);
  };

  // ACCOUNTS TAB
  const [accountsFields, setAccountsFieldsState] = useState<Field[]>([
    {
      label: "email",
      placeholder: "mail@mail.com",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "com.twitter",
      placeholder: "@twitter",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "com.linkedin",
      placeholder: "/linkedin",
      value: "",
      fieldType: FieldType.Text,
    },
  ]);

  // INITIAL ACCOUNTS STATE
  const [initialAccountsFields, setInitialAccountsFieldsState] = useState<
    Field[]
  >([
    {
      label: "email",
      placeholder: "mail@mail.com",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "com.twitter",
      placeholder: "@twitter",
      value: "",
      fieldType: FieldType.Text,
    },
    {
      label: "com.linkedin",
      placeholder: "/linkedin",
      value: "",
      fieldType: FieldType.Text,
    },
  ]);

  // ADDRESS TAB
  const [addressesFields, setAddressesFieldsState] = useState<Field[]>([
    {
      label: "eth",
      placeholder: "0x0000000000000000000000000000000000000000",
      fieldType: FieldType.Address,
      value: "",
      validationFunction: (fieldValue: string) => {
        const fieldIsEmpty: Readonly<boolean> = fieldValue === "";
        const isValidAddress: Readonly<boolean> =
          typeof fieldValue === "string" && !!isAddress(fieldValue);

        return fieldIsEmpty || isValidAddress;
      },
    } as Field,
  ]);

  // INITIAL ADDRESS STATE
  const [initialAddressesFields, setInitialAddressesFieldsState] = useState<
    Field[]
  >([
    {
      label: "ETH",
      placeholder: "0x0000000000000000000000000000000000000000",
      fieldType: FieldType.Address,
      value: "",
      validationFunction: (fieldValue: string) => {
        const fieldIsEmpty: boolean = fieldValue === "";
        const isAddressValid: boolean =
          typeof fieldValue === "string" && !!isAddress(fieldValue);

        return fieldIsEmpty || isAddressValid;
      },
    } as Field,
  ]);

  const updateFieldsWithEnsData = (ensData: ResolvedEnsData | null) => {
    console.log(ensData);
    if (!ensData) {
      console.warn("FieldsContext - updateFieldsWithEnsData - No ENS Data");
      return;
    }
    if (!ensData.texts || _.isEmpty(ensData.texts)) {
      console.warn(
        "FieldsContext - updateFieldsWithEnsData - Empty ENS Data texts"
      );
    }
    const textsKeys = Object.keys(ensData.texts || {});
    const coinNames = ensData.coins?.map((coin) => coin.name) ?? [];
    const newProfileFields: Field[] = profileFields.map((field) => {
      if (textsKeys.includes(field.label)) {
        return {
          ...field,
          value: (ensData.texts as TextRecords)[field.label] as string,
        };
      }
      return field;
    });
    const newAddressesFields = addressesFields.map((field) => {
      if (coinNames.includes(field.label)) {
        return {
          ...field,
          value: (ensData.coins as DecodedAddr[]).find((coin)=>coin.name===field.label)?.value as string,
        };
      }
      return field;
    });
    const newAccountsFields = accountsFields.map((field) => {
      if (textsKeys.includes(field.label)) {
        return {
          ...field,
          value: (ensData.texts as TextRecords)[field.label] as string,
        };
      }
      return field;
    });
    const newFieldsByTab = {
      [Tab.Profile]: newProfileFields,
      [Tab.Accounts]: newAccountsFields,
      [Tab.Addresses]: newAddressesFields,
    };
    [Tab.Profile, Tab.Accounts, Tab.Addresses].forEach((tab) => {
      setFields(tab, newFieldsByTab[tab]);
      setInitialFields(tab, newFieldsByTab[tab]);
    });
  };

  return (
    <FieldsContext.Provider
      value={{
        profileFields,
        initialProfileFields,
        accountsFields,
        initialAccountsFields,
        addressesFields,
        initialAddressesFields,
        domainAddressesToUpdate,
        textRecordsToUpdate,
        updateFieldsWithEnsData,
        addField,
        updateField,
        setFields,
        setInitialFields,
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};

// Custom hook to use the fields context
const useFields = () => {
  const context = useContext(FieldsContext);
  if (context === undefined) {
    throw new Error("useFields must be used within a FieldsProvider");
  }
  return context;
};

export { FieldsProvider, useFields, Tab };
