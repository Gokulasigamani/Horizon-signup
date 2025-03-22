"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFlowStack = void 0;
const cdk = __importStar(require("@aws-cdk/core"));
const lambda = __importStar(require("@aws-cdk/aws-lambda"));
const apigateway = __importStar(require("@aws-cdk/aws-apigateway"));
const iam = __importStar(require("@aws-cdk/aws-iam"));
class SignupFlowStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.SignupFlowStack = SignupFlowStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLWZsb3ctc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWdudXAtZmxvdy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxQztBQUNyQyw0REFBOEM7QUFDOUMsb0VBQXNEO0FBQ3RELHNEQUF3QztBQUV4QyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDMUMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztRQUN6QyxNQUFNLGdCQUFnQixHQUFHLDRCQUE0QixDQUFDO1FBRXRELE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzNELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFdBQVcsRUFBRTtnQkFDVCxZQUFZLEVBQUUsVUFBVTtnQkFDeEIsbUJBQW1CLEVBQUUsZ0JBQWdCO2FBQ3hDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDakQsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QjtnQkFDN0IsMEJBQTBCO2dCQUMxQiwrQkFBK0I7Z0JBQy9CLHlDQUF5QztnQkFDekMsb0NBQW9DO2dCQUNwQywyQkFBMkI7YUFDOUI7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxhQUFhLFVBQVUsRUFBRSxDQUFDO1NBQzNGLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDbEQsV0FBVyxFQUFFLGVBQWU7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUVqRixNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Q0FDSjtBQXZDRCwwQ0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcblxuZXhwb3J0IGNsYXNzIFNpZ251cEZsb3dTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgdXNlclBvb2xJZCA9IFwidXMtd2VzdC0yX0dKQUZqcE40UVwiO1xuICAgICAgICBjb25zdCB1c2VyUG9vbENsaWVudElkID0gXCI2YWc3NTQxYjVxY29kM3NzazJ2Y3E1YjY5cFwiO1xuXG4gICAgICAgIGNvbnN0IHNpZ251cExhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ1NpZ251cExhbWJkYScsIHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICAgICAgaGFuZGxlcjogJ3NpZ251cC5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIFVTRVJfUE9PTF9JRDogdXNlclBvb2xJZCxcbiAgICAgICAgICAgICAgICBVU0VSX1BPT0xfQ0xJRU5UX0lEOiB1c2VyUG9vbENsaWVudElkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lnbnVwTGFtYmRhLmFkZFRvUm9sZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ2NvZ25pdG8taWRwOkFkbWluQ3JlYXRlVXNlcicsXG4gICAgICAgICAgICAgICAgJ2NvZ25pdG8taWRwOkFkbWluR2V0VXNlcicsXG4gICAgICAgICAgICAgICAgJ2NvZ25pdG8taWRwOkFkbWluSW5pdGlhdGVBdXRoJyxcbiAgICAgICAgICAgICAgICAnY29nbml0by1pZHA6QWRtaW5SZXNwb25kVG9BdXRoQ2hhbGxlbmdlJyxcbiAgICAgICAgICAgICAgICAnY29nbml0by1pZHA6UmVzZW5kQ29uZmlybWF0aW9uQ29kZScsXG4gICAgICAgICAgICAgICAgJ2NvZ25pdG8taWRwOkNvbmZpcm1TaWduVXAnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbYGFybjphd3M6Y29nbml0by1pZHA6JHt0aGlzLnJlZ2lvbn06JHt0aGlzLmFjY291bnR9OnVzZXJwb29sLyR7dXNlclBvb2xJZH1gXSxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ1NpZ251cEFwaScsIHtcbiAgICAgICAgICAgIHJlc3RBcGlOYW1lOiAnU2lnbnVwU2VydmljZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNpZ251cFJlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ3NpZ251cCcpO1xuICAgICAgICBzaWdudXBSZXNvdXJjZS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihzaWdudXBMYW1iZGEpKTtcblxuICAgICAgICBjb25zdCBjb25maXJtUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnY29uZmlybScpO1xuICAgICAgICBjb25maXJtUmVzb3VyY2UuYWRkTWV0aG9kKCdQT1NUJywgbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oc2lnbnVwTGFtYmRhKSk7XG4gICAgfVxufVxuIl19