import AWS = require('aws-sdk');

//Configure AWS
if(process.env.AWS_PROFILE !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  accessKeyId :process.env.accessKeyId,
  secretAccessKey :process.env.secretAccessKey,
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  params: {Bucket: process.env.AWS_S3_MEDIA_BUCKET}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{
  const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_MEDIA_BUCKET,
        Key: key,
        Expires: signedUrlExpireSeconds
      });

    return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('putObject', {
      Bucket: process.env.AWS_S3_MEDIA_BUCKET,
      Key: key,
      Expires: signedUrlExpireSeconds
    });
    return url
    
}
