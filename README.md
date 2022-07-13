# analysis-script
Analysis script to generate a PDF report on last day bracelets data, and calculate serendipity using a Sentiment Service of AWS.  

## Note
All reports are saved in an S3 Bucket.  

## Environment variables
API_GATEWAY="your api gateway base endpoint ex. url/api/"  
OUTPUT_FILE="name of output PDF file"  
S3_BUCKET="bucket name"  
REGION="your aws region "  
ACCESS_KEY_ID="aws access key"  
SECRET_ACCESS_KEY="aws secret access key"  
