import { validateUrl, validateEmail } from '../../containers/App/globalHelpers';

export const validateForm = (
  currentFormStep,
  setCurrentFormStep,
  clientProfile,
  recipients,
  teamSetupData,
  isNextBtn = true,
  addBlurState,
) => {
  const {
    address,
    client_name,
    business_name,
    city,
    zip_code,
    country_id,
    website,
    business_category_id,
    nbr_setups,
    nbr_requisitions,
    primary_contact,
    primary_contact_last_name,
    primary_contact_position,
    primary_contact_email,
    primary_contact_mobile,
    primary_contact_landline,
    signatory,
    signatory_position,
    signatory_email,
    signatory_mobile,
    signatory_landline,
    finance_mgr_first_name,
    finance_mgr_last_name,
    finance_mgr_email,
    hiring_mgr_first_name,
    hiring_mgr_last_name,
    hiring_mgr_email,
    preferred_currency,
  } = clientProfile;
  switch (isNextBtn ? currentFormStep : currentFormStep.previous) {
    case 0:
      const hasEmpty =
        !address ||
        !city ||
        !zip_code ||
        !country_id ||
        !business_category_id ||
        !client_name ||
        !business_name;
      const isUrlValid = website === '' ? true : !!validateUrl(website);

      if (hasEmpty || !isUrlValid) {
        if (!isNextBtn) {
          addBlurState(currentFormStep.previous);
          setCurrentFormStep(currentFormStep.previous);
        }
        return {
          hasEmpty,
          isUrlValid: website === '' ? true : !!validateUrl(website),
          address: address !== '',
          country_id: country_id !== '',
          city: city !== '',
          zip_code: zip_code !== '',
          client_name: client_name !== '',
          business_name: business_name !== '',
          business_category_id: business_category_id !== '',
        };
      }

      if (!isNextBtn) {
        addBlurState(currentFormStep.next);
        setCurrentFormStep(currentFormStep.next);
        return { isFinal: false, state: true };
      }
      setCurrentFormStep(parseInt(currentFormStep) + parseInt(1));
      addBlurState(parseInt(currentFormStep) + parseInt(1));
      return { isFinal: false, state: true };
    case 1:
      if (!nbr_setups || !nbr_requisitions) {
        if (!isNextBtn) {
          addBlurState(currentFormStep.previous);
          setCurrentFormStep(currentFormStep.previous);
        }
        return {
          nbr_setups: !!nbr_setups,
          nbr_requisitions: !!nbr_requisitions,
        };
      }
      if (!isNextBtn) {
        addBlurState(currentFormStep.next);
        setCurrentFormStep(currentFormStep.next);
        return { isFinal: false, state: true };
      }
      setCurrentFormStep(parseInt(currentFormStep) + parseInt(1));
      addBlurState(parseInt(currentFormStep) + parseInt(1));
      return { isFinal: false, state: true };
    case 2:
      const hasEmptyContacts =
        !primary_contact ||
        !primary_contact_last_name ||
        !primary_contact_position ||
        !primary_contact_email ||
        !primary_contact_mobile ||
        !signatory ||
        !signatory_position ||
        !signatory_email ||
        !signatory_mobile ||
        !signatory_landline ||
        !finance_mgr_first_name ||
        !finance_mgr_last_name ||
        !finance_mgr_email ||
        !hiring_mgr_first_name ||
        !hiring_mgr_last_name ||
        !hiring_mgr_email;

      const recipientLength = recipients.length;
      const hasRecipients = recipients.length > 0;
      const recipientValidation = [];
      let recipientHasErrors = 0;

      if (hasRecipients) {
        for (let i = 0; i < recipientLength; i++) {
          if (!recipients[i].email || !validateEmail(recipients[i].email)) {
            recipientHasErrors++;
          }
          if (!recipients[i].firstName) {
            recipientHasErrors++;
          }
          if (!recipients[i].lastName) {
            recipientHasErrors++;
          }

          recipientValidation.push({
            email: !recipients[i].email
              ? false
              : validateEmail(recipients[i].email),
            firstName: !!recipients[i].firstName,
            lastName: !!recipients[i].lastName,
          });
        }
      }

      if (hasEmptyContacts || recipientHasErrors) {
        if (!isNextBtn) {
          addBlurState(currentFormStep.previous);
          setCurrentFormStep(currentFormStep.previous);
        }
        return {
          primary_contact: !(primary_contact === '' || !primary_contact),
          primary_contact_last_name: !(
            primary_contact_last_name === '' || !primary_contact_last_name
          ),
          primary_contact_position: !(
            primary_contact_position === '' || !primary_contact_position
          ),
          primary_contact_email:
            primary_contact_email === '' || !primary_contact_email
              ? false
              : !!validateEmail(primary_contact_email),
          primary_contact_mobile: !(
            primary_contact_mobile === '' || !primary_contact_mobile
          ),
          primary_contact_landline: !(
            primary_contact_landline === '' || !primary_contact_landline
          ),
          signatory: !(signatory === '' || !signatory),
          signatory_position: !(
            signatory_position === '' || !signatory_position
          ),
          signatory_email:
            signatory_email === '' || !signatory_email
              ? false
              : !!validateEmail(signatory_email),
          signatory_mobile: !(signatory_mobile === '' || !signatory_mobile),
          signatory_landline: !(
            signatory_landline === '' || !signatory_landline
          ),
          finance_mgr_first_name: !(
            finance_mgr_first_name === '' || !finance_mgr_first_name
          ),
          finance_mgr_last_name: !(
            finance_mgr_last_name === '' || !finance_mgr_last_name
          ),
          finance_mgr_email:
            finance_mgr_email === '' || !finance_mgr_email
              ? false
              : !!validateEmail(finance_mgr_email),
          hiring_mgr_first_name: !(
            hiring_mgr_first_name === '' || !hiring_mgr_first_name
          ),
          hiring_mgr_last_name: !(
            hiring_mgr_last_name === '' || !hiring_mgr_last_name
          ),
          hiring_mgr_email:
            hiring_mgr_email === '' || !hiring_mgr_email
              ? false
              : !!validateEmail(hiring_mgr_email),
          recipientValidation,
        };
      }
      if (!isNextBtn) {
        setCurrentFormStep(currentFormStep.next);
        addBlurState(currentFormStep.next);
        return { isFinal: false, state: true };
      }
      setCurrentFormStep(parseInt(currentFormStep) + parseInt(1));
      addBlurState(parseInt(currentFormStep) + parseInt(1));
      return { isFinal: false, state: true };
    case 3:
      if (!preferred_currency) {
        if (!isNextBtn) {
          setCurrentFormStep(currentFormStep.previous);
          addBlurState(currentFormStep.previous);
        }
        return {
          preferred_currency: !!preferred_currency,
        };
      }
      if (!isNextBtn) {
        setCurrentFormStep(currentFormStep.next);
        addBlurState(currentFormStep.next);
        return { isFinal: false, state: true };
      }
      setCurrentFormStep(parseInt(currentFormStep) + parseInt(1));
      addBlurState(parseInt(currentFormStep) + parseInt(1));
      return { isFinal: false, state: true };
    case 4:
      if (teamSetupData) {
        const teamSetupLength = teamSetupData.length;
        const hasTeamSetup = teamSetupLength > 0;
        const teamSetupValidation = [];
        let teamSetupHasErrors = false;

        if (hasTeamSetup) {
          for (let i = 0; i < teamSetupLength; i++) {
            if (teamSetupData[i]) {
              if (teamSetupData[i].quantity <= 0 
                  || teamSetupData[i].quantity > 99
                  || teamSetupData[i].quantity % 1 != 0
                ) {
                teamSetupValidation.push({ index: i, quantity: false });
                teamSetupHasErrors = true;
              } else {
                teamSetupValidation.push({ index: i, quantity: true });
              }
            }
          }
        }

        if (teamSetupHasErrors) {
          if (!isNextBtn) {
            addBlurState(currentFormStep.previous);
            setCurrentFormStep(currentFormStep.previous);
          }
          return { teamSetupValidation };
        }

        if (!isNextBtn) {
          addBlurState(currentFormStep.next);
          setCurrentFormStep(currentFormStep.next);
          return { isFinal: true, state: true };
        }

        return false;
      }
  }
};

export const isAllFieldValid = clientProfileInternal => {
  if (!clientProfileInternal) {
    return;
  }
  const {
    address,
    city,
    zip_code,
    country_id,
    website,
    business_category_id,
    nbr_setups,
    nbr_requisitions,
    primary_contact,
    primary_contact_last_name,
    primary_contact_position,
    primary_contact_email,
    primary_contact_mobile,
    primary_contact_landline,
    signatory,
    signatory_position,
    signatory_mobile,
    signatory_landline,
    finance_mgr_first_name,
    finance_mgr_last_name,
    hiring_mgr_first_name,
    hiring_mgr_last_name,
    preferred_currency,
  } = clientProfileInternal;

  const isUrlValid = website === '' ? true : !!validateUrl(website);
  if (!isUrlValid) return false;

  if (
    !address ||
    !city ||
    !zip_code ||
    !country_id ||
    !business_category_id ||
    !isUrlValid ||
    !primary_contact ||
    !primary_contact_last_name ||
    !primary_contact_position ||
    !primary_contact_email ||
    !primary_contact_mobile ||
    !signatory ||
    !signatory_position ||
    !signatory_mobile ||
    !signatory_landline ||
    !finance_mgr_first_name ||
    !finance_mgr_last_name ||
    !hiring_mgr_first_name ||
    !hiring_mgr_last_name ||
    !primary_contact ||
    !primary_contact ||
    !primary_contact_last_name ||
    !primary_contact_position ||
    !primary_contact_mobile ||
    !primary_contact_landline ||
    !signatory ||
    !signatory_position ||
    !signatory_mobile ||
    !signatory_landline ||
    !finance_mgr_first_name ||
    !finance_mgr_last_name ||
    !hiring_mgr_first_name ||
    !hiring_mgr_last_name ||
    !nbr_setups ||
    !nbr_requisitions ||
    !preferred_currency
  ) {
    return false;
  }

  return true;
};


export const validateTeamSetup = data => {
  const length = data.length;
  const container = [];
  let isSpecifiedDescriptionEmpty = false;
  let isDescriptionValid = true;
  // accept only aplha numeric
  const regxp = /^[a-zA-Z0-9 ]+$/;

  // containers
  const errorContainers = [];

  for (let i = 0; i < length; i++) {
    isSpecifiedDescriptionEmpty = false;
    isDescriptionValid = true;
    if (data[i] && data[i].job_title === 'Others') {
      container.push(`${data[i].description} ${data[i].experience_level}`);
      if (data[i] && !data[i].description) {
        isSpecifiedDescriptionEmpty = true;
      }
      if (data[i] && data[i].description && !(data[i].description.match(regxp))) {
        isDescriptionValid = false;
      }
    } else if (data[i] && data[i].job_title !== 'Others') {
      container.push(`${data[i].job_title} ${data[i].experience_level}`);
    }
    errorContainers.push({
      isSpecifiedDescriptionEmpty: isSpecifiedDescriptionEmpty,
      isDescriptionValid: isDescriptionValid,
    })
  }

  const hasDuplicates = (new Set(container)).size !== container.length;
  return {
    hasDuplicates: hasDuplicates,
    errors: errorContainers
  };
}