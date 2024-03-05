/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MovieNewsUpdateFormInputValues = {
    image?: string;
    title?: string;
    detail?: string;
    publishInfo?: string;
};
export declare type MovieNewsUpdateFormValidationValues = {
    image?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    detail?: ValidationFunction<string>;
    publishInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieNewsUpdateFormOverridesProps = {
    MovieNewsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    detail?: PrimitiveOverrideProps<TextFieldProps>;
    publishInfo?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MovieNewsUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieNewsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movieNews?: any;
    onSubmit?: (fields: MovieNewsUpdateFormInputValues) => MovieNewsUpdateFormInputValues;
    onSuccess?: (fields: MovieNewsUpdateFormInputValues) => void;
    onError?: (fields: MovieNewsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieNewsUpdateFormInputValues) => MovieNewsUpdateFormInputValues;
    onValidate?: MovieNewsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieNewsUpdateForm(props: MovieNewsUpdateFormProps): React.ReactElement;
