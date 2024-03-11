/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMovieRating } from "../graphql/queries";
import { updateMovieRating } from "../graphql/mutations";
const client = generateClient();
export default function MovieRatingUpdateForm(props) {
  const {
    id: idProp,
    movieRating: movieRatingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    movieId: "",
    userId: "",
    rate: "",
  };
  const [movieId, setMovieId] = React.useState(initialValues.movieId);
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [rate, setRate] = React.useState(initialValues.rate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = movieRatingRecord
      ? { ...initialValues, ...movieRatingRecord }
      : initialValues;
    setMovieId(cleanValues.movieId);
    setUserId(cleanValues.userId);
    setRate(cleanValues.rate);
    setErrors({});
  };
  const [movieRatingRecord, setMovieRatingRecord] =
    React.useState(movieRatingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMovieRating.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMovieRating
        : movieRatingModelProp;
      setMovieRatingRecord(record);
    };
    queryData();
  }, [idProp, movieRatingModelProp]);
  React.useEffect(resetStateValues, [movieRatingRecord]);
  const validations = {
    movieId: [],
    userId: [],
    rate: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          movieId: movieId ?? null,
          userId: userId ?? null,
          rate: rate ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMovieRating.replaceAll("__typename", ""),
            variables: {
              input: {
                id: movieRatingRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MovieRatingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Movie id"
        isRequired={false}
        isReadOnly={false}
        value={movieId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              movieId: value,
              userId,
              rate,
            };
            const result = onChange(modelFields);
            value = result?.movieId ?? value;
          }
          if (errors.movieId?.hasError) {
            runValidationTasks("movieId", value);
          }
          setMovieId(value);
        }}
        onBlur={() => runValidationTasks("movieId", movieId)}
        errorMessage={errors.movieId?.errorMessage}
        hasError={errors.movieId?.hasError}
        {...getOverrideProps(overrides, "movieId")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              movieId,
              userId: value,
              rate,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rate}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              movieId,
              userId,
              rate: value,
            };
            const result = onChange(modelFields);
            value = result?.rate ?? value;
          }
          if (errors.rate?.hasError) {
            runValidationTasks("rate", value);
          }
          setRate(value);
        }}
        onBlur={() => runValidationTasks("rate", rate)}
        errorMessage={errors.rate?.errorMessage}
        hasError={errors.rate?.hasError}
        {...getOverrideProps(overrides, "rate")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || movieRatingModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || movieRatingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
