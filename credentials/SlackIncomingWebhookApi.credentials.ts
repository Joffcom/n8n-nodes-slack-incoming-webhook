import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SlackIncomingWebhookApi implements ICredentialType {
	name = 'slackIncomingWebhookApi';
	displayName = 'Slack Incoming Webhook API';
	properties: INodeProperties[] = [
		{
			displayName: 'Webhook URL',
			name: 'webhookUrl',
			type: 'string',
			default: '',
		},
	];
}
