import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';

export class SignupFlowStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userPoolId = "us-west-2_GJAFjpN4Q";
        const userPoolClientId = "6ag7541b5qcod3ssk2vcq5b69p";

        const signupLambda = new lambda.Function(this, 'SignupLambda', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'signup.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                USER_POOL_ID: userPoolId,
                USER_POOL_CLIENT_ID: userPoolClientId,
            },
        });

        signupLambda.addToRolePolicy(new iam.PolicyStatement({
            actions: [
                'cognito-idp:AdminCreateUser',
                'cognito-idp:AdminGetUser',
                'cognito-idp:AdminInitiateAuth',
                'cognito-idp:AdminRespondToAuthChallenge',
                'cognito-idp:ResendConfirmationCode',
                'cognito-idp:ConfirmSignUp'
            ],
            resources: [`arn:aws:cognito-idp:${this.region}:${this.account}:userpool/${userPoolId}`],
        }));

        const api = new apigateway.RestApi(this, 'SignupApi', {
            restApiName: 'SignupService',
        });

        const signupResource = api.root.addResource('signup');
        signupResource.addMethod('POST', new apigateway.LambdaIntegration(signupLambda));

        const confirmResource = api.root.addResource('confirm');
        confirmResource.addMethod('POST', new apigateway.LambdaIntegration(signupLambda));
    }
}
