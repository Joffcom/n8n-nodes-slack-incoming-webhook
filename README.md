# n8n-nodes-slack-incoming-webhook

This is an n8n community node. It lets you use the Legact Slack Incoming Webhook in your n8n workflows.

Slack Incoming Webhook is easier to set up than a full Slack app and will allow you to quickly send messages to a Slack channel.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Usage](#usage)
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Send Message

## Credentials

### Prerequisites
You must have permission to add the [Legacy Incoming Webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) integration to your Slack instance

### Using a Slack Webhook URL
After adding the Incoming Webhook app to your Slack instance copy your Webhook URL and use it in the Slack Incoming Webhook node credentials in n8n.

## Compatibility

This has been tested with n8n 0.189.1 and 0.191.1

## Usage
Below is some quick steps to show how you can use this node and a sample workflow.

### Example Worlflow

##### 1. Start Node
 - The start node exists by default when you create a new workflow.

##### 2. Slack Webhook node
 - First enter your credentials. You can find out how to do that here.
 - Fill in the remaining parameters as follows:
 - Operation: Select Send Message from the dropdown list.
 - Message: Input the message you want to send.

##### Workflow JSON
```
{
  "nodes": [
    {
      "parameters": {},
      "id": "1283a3ba-aa49-471f-83cc-867ad75a66f9",
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [
        -260,
        300
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "de0aaa94-a28d-4b12-9b1c-266e0e126840",
      "name": "Slack Incoming Webhook",
      "type": "n8n-nodes-slack-incoming-webhook.slackIncomingWebhook",
      "typeVersion": 1,
      "position": [
        -60,
        300
      ],
      "credentials": {
        "slackIncomingWebhookApi": {
          "id": "8",
          "name": "Slack Incoming Webhook account"
        }
      }
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "Slack Incoming Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Legacy Incoming Webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)

## Version history

1.0.0 - Initial Release
