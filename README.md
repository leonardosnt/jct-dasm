# jct-dasm

Simple CLI tool to print ClassFiles¹ as text/json.

¹: See [java-class-tools](https://github.com/leonardosnt/java-class-tools) and [jvms 4.1](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.1)

``$ jct-dasm --json path/to/java/lang/String.class``

Will print this:

```java
{
  "minor_version": 0,
  "major_version": 52,
  "constant_pool_count": 537,
  "constant_pool": [
    null,
    {
      "tag": 3,
      "bytes": 55296
    },
    {
      "tag": 3,
      "bytes": 56319
    },
    {
      "tag": 3,
      "bytes": 57343
    },
    // ...
  ],
  "methods_count": 94,
  "methods": [
    {
      "access_flags": 1,
      "name_index": 63,
      "descriptor_index": 19,
      "attributes_count": 1,
      "attributes": [
        {
          "attribute_name_index": 65,
          "attribute_length": 26,
          "max_stack": 2,
          "max_locals": 1,
          "code_length": 14,
          "code": [
            42,
            183,
            1,
            200,
            42,
            18,
            5,
            180,
            1,
            165,
            181,
            1,
            165,
            177
          ],
          "exception_table_length": 0,
          "exception_table": [],
          "attributes_count": 0,
          "attributes": []
        }
      ]
    },
    // ...
```
