import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class KlaviyoApi implements ICredentialType {
	name = 'klaviyoApi';
	displayName = 'Klaviyo API';
	icon: Icon = 'file:logo.png';
	documentationUrl = 'https://developers.klaviyo.com/en/docs/authenticate_';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
			hint: 'Credential must have read access to events to pass authentication test',
		},
		{
			displayName: 'API Revision',
			name: 'revision',
			type: 'options',
			options: [
				{
					name: '2025-01-15',
					value: '2025-01-15',
				},
				{
					name: '2024-10-15',
					value: '2024-10-15',
				},
				{
					name: '2024-07-15',
					value: '2024-07-15',
				},
				{
					name: '2024-06-15',
					value: '2024-06-15',
				},
				{
					name: '2024-05-15',
					value: '2024-05-15',
				},
				{
					name: '2024-02-15',
					value: '2024-02-15',
				},
			],
			default: '2025-01-15',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Klaviyo-API-Key " + $credentials.token}}',
				accept: 'application/vnd.api+json',
				revision: '={{$credentials.revision}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://a.klaviyo.com/api',
			url: '/events',
		},
	};
}
