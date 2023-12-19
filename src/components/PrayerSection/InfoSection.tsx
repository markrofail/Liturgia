import React from "react";
import { MultiLingualText } from "../MultiLingualText";
import { MultiLingualText as MultiLingualTextT } from "../../types";

interface InfoSectionProps {
    text?: MultiLingualTextT;
}
export const InfoSection = ({ text }: InfoSectionProps) =>
    !!text && <MultiLingualText variant="body" color="yellow" text={text} />;
