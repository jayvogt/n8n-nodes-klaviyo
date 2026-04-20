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
	icon: Icon = 'file:klaviyo.svg';
	documentationUrl = 'https://developers.klaviyo.com/en/docs/authenticate_';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			hint: 'Credential must have read access to events to pass authentication test',
		},
		{
			displayName: 'API Revision',
			name: 'revision',
			type: 'options',
			options: [
				{
					name: '2026-04-15',
					value: '2026-04-15',
				},
				{
					name: '2026-01-15',
					value: '2026-01-15',
				},
				{
					name: '2025-10-15',
					value: '2025-10-15',
				},
				{
					name: '2025-07-15',
					value: '2025-07-15',
				},
				{
					name: '2025-04-15 (Deprecated)',
					value: '2025-04-15',
				},
				{
					name: '2025-01-15 (Deprecated)',
					value: '2025-01-15',
				},
				{
					name: '2024-10-15 (Deprecated)',
					value: '2024-10-15',
				},
			],
			default: '2026-04-15',
		},
	];

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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://a.klaviyo.com/api',
			url: '/events',
		},
	};
}
