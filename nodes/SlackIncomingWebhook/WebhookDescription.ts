import {
	INodeProperties,
} from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: 'Hello world!',
		description: 'Message to send to Slack',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Options',
		default: {},
		options: [
			{
				displayName: 'Icon',
				name: 'icon',
				type: 'string',
				default: ':robot_face:',
				description: 'Set the icon to use for the message',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: 'n8n-bot',
				description: 'Set the name for the message',
			},
		],
	},
];
