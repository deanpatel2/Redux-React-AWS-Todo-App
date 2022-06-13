import json
import boto3
    
def lambda_handler(event, context):
    print(event)
    dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
    table = dynamodb.Table('dean-task-table')
    if (event["path"] == "/gettasks" and event['httpMethod'] == "GET"):
        response = table.scan()
        data = response['Items']
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response['Items'])
        return {
            'statusCode': 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            'body': json.dumps(data)
        }
    elif (event["path"] == "/addtask" and event["httpMethod"] == "POST"):
        task = json.loads(event["body"])
        response = put_task(table, task)
        return {
            'statusCode': 200,
                    "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            'body': json.dumps(response)
        }
    elif (event["path"] == "/savetasks" and event["httpMethod"] == "POST"):
        tasks = json.loads(event["body"])
        delete_tasks(table)
        for task in tasks:
            response = put_task(table, task)
        return {
            'statusCode': 200,
                    "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            'body': json.dumps("Saved Tasks")
        }

def put_task(table, task):
    response = table.put_item(
            Item={
                'task_id': task['id'],
                'task_name': task['name'],
                'completed': task['completed'],
            }
    )
    return response
    
def delete_tasks(table):
    scan = table.scan()
    for task in scan['Items']:
        table.delete_item(
            Key={
            'task_id': task['task_id']
            }
        )