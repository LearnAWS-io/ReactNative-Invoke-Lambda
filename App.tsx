import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AwsClient} from 'react-native-quick-aws4';

const awsClient = new AwsClient({
  accessKeyId: 'xxx',
  secretAccessKey: 'xxx',
  region: 'us-east-1',
});

export default function App() {
  const [res, setRes] = useState('');
  const invokeLambda = async () => {
    const payload = {
      functionName: 'echo-fn',
      invocationType: 'RequestResponse',
      payload: JSON.stringify(
        `Hello from LearnAWS.io\nSent at: ${new Date().toTimeString()}`,
      ),
    };
    const lambdaRes = await awsClient.fetch(
      `https://lambda.${awsClient.region}.amazonaws.com/2015-03-31/functions/${payload.functionName}/invocations`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload.payload,
      },
    );
    console.log(lambdaRes.status);
    setRes(await lambdaRes.json());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{res}</Text>
      <Button title="Invoke Lambda" onPress={invokeLambda} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {margin: 12},
  text: {
    fontSize: 18,
    fontFamily: 'monospace',
    paddingVertical: 12,
  },
});
