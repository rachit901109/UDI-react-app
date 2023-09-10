from flask import current_app
from pan_aadhar_ocr import Aadhar_Info_Extractor, Pan_Info_Extractor
import re
from pprint import pprint
from PIL import Image
import pytesseract
import base64

def isValidAadhaarNumber(str):
 
    # Regex to check valid
    # Aadhaar number.
    regex = ("^[2-9]{1}[0-9]{3}\\" +
             "s[0-9]{4}\\s[0-9]{4}$")
     
    # Compile the ReGex
    p = re.compile(regex)
 
    # If the string is empty
    # return false
    if (str == None):
        return False
 
    # Return if the string
    # matched the ReGex
    if(re.search(p, str)):
        return True
    else:
        return False 
    

def isValidPanCardNo(panCardNo):
 
    # Regex to check valid
    # PAN Card number
    regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
 
    # Compile the ReGex
    p = re.compile(regex)
 
    # If the PAN Card number
    # is empty return false
    if(panCardNo == None):
        return False
 
    # Return if the PAN Card number
    # matched the ReGex
    if(re.search(p, panCardNo) and
       len(panCardNo) == 10):
        return True
    else:
        return False


def get_aadhar_info(front_img: str, back_img : str) -> dict:
    #define extractor
    extractor = Aadhar_Info_Extractor()

    result = extractor.info_extractor(front_image=front_img, back_image=back_img)
    # Input string
    data = result

    # Define regular expressions for each field
    aadhar_pattern = r'"Aadhar_number":\s*"(\d{4}\s\d{4}\s\d{4})"'
    name_pattern = r'"Name":\s*"([^"]*)"'
    gender_pattern = r'"Gender":\s*"([^"]*)"'
    dob_pattern = r'"DOB":\s*"([^"]*)"'
    address_pattern = r'"Address":\s*"([^"]*?,\s*\d{6})'

    # Use regex to extract data
    aadhar_match = re.search(aadhar_pattern, data)
    name_match = re.search(name_pattern, data)
    gender_match = re.search(gender_pattern, data)
    dob_match = re.search(dob_pattern, data)
    address_match = re.search(address_pattern, data)

    # Extracted data
    if aadhar_match:
        aadhar_number = aadhar_match.group(1)
    else:
        aadhar_number = "Not found"

    if name_match:
        name = name_match.group(1)
    else:
        name = "Not found"

    if gender_match:
        gender = gender_match.group(1)
    else:
        gender = "Not found"

    if dob_match:
        dob = dob_match.group(1)
    else:
        dob = "Not found"

    if address_match:
        address = address_match.group(1)
    else:
        address = "Not found"

    user_info = {"Aadhar Number": aadhar_number, "Name": name, "Gender":gender, "DOB":dob, "Address":address}
    return user_info


def get_pan_info(pan_img: str):
    pan_image = Image.open(pan_img)  # Replace with the path to your PAN card image
    pan_text = pytesseract.image_to_string(pan_image)

    # Define regular expressions to match PAN number and name
    pan_number_pattern = r"[A-Z]{5}[0-9]{4}[A-Z]{1}"

    # Extract PAN number
    pan_number_match = re.search(pan_number_pattern, pan_text)
    if pan_number_match:
        pan_number = pan_number_match.group(0)
    else:
        pan_number = "PAN number not found"


    # Print the extracted information
    print("PAN Number:", pan_number)

    return {"PAN Number": pan_number}

# since we dont the binary data of the image we can directly use it
# def encode_image(binary_image_data):
#     encoded_image = base64.b64encode(binary_image_data).decode('utf-8')
#     return encoded_image

def encode_image(image_path):
    with open(image_path, 'rb') as image_file:
        encode_image = base64.b64encode(image_file.read()).decode('utf-8')
    return encode_image


def decode_image(bsimage):
    decode_aadhar = base64.b64decode(bsimage)
    return decode_aadhar