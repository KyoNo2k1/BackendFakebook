import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "fakebook-chat",
        "private_key_id": "c66744744f88d44c0f94f8e9ed176eea86bf7035",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpnr/hduSqROHa\nIgbbOC+RfqA2uwAtr9x9BMMyNVKsMK/8ZbkQroFz29OZkf9GBVmdlH6RmNV1+a+U\nexK0QXJ3Mguj5IO46ZcjDJChz+GNnE3B1zA9t+92WTMgAvQKFYsdYP/syeKRVtoD\nmJKRr5H98hgCi/nj84BeFKRgCD4bV41WgG1g/XchIOgP2ZSGP+NGyoMb87iTtbzO\nRbijxUR/idbRDcKDetnPHF2OrkNUle/+hQJQMTrSP0ef8TjWqdBVWNytzebeBIQI\n62OZnzi1m08HGEwihz5fmlSFQfvkAm49FqrJmCfwvWf8WgjPmGc7SE2M2nF0OqMq\nLdQlEVf5AgMBAAECggEAAPryo3AvNp+yyXKwZPRwa/AWJ3LRt7HgPZW5NhFSUr3u\nSnBhDyxfAacn1CegmMw/nhZFW/yM4UNp5RsH+uQ07+TpZc9Uho1NCw4PyOudY1bf\nqSrf879cIiw2TC1QMT26IdeVaw4oocvlcyde03o3Bwdu5ZbfARb/ayvF3ms1xq0q\nsZ85yPTef1TVhsx1WIBtUsQjiN22S/8CwlhBGo93muRKnPV1TfqfyU1l1XPL1lBZ\nDGKuU3mI4R6by++dRfCJLbxvIMgv+/BqpNAFj6m6Ro+weY1yyl+mIZJwM6ycOyxO\nVFLcbV8ySUX24BY9hRYpoSPlLQlQi7rv+NBUNE9NnQKBgQDca1BbzH4iN0woLPEb\nRboH/szsEkF+2HQ9rYQ8c8kJw5hhTTVL8WQXU7BClB120FFPEZZa2SFJ9TF+lFqm\nklYEuhAEksI2tC46F5O/z5uKnzVTfPa+7/+387WYZmrFdGZC5hVbCwdANaVjYd8V\nV1eUuqDspeeOS28/fu1Ul4lbnQKBgQDFADH9hIJniMiCoIKm5x5kXB/bo6LoUBXl\noCfAPcsdQi5JlLHtZ2LJ937wVDRXgp9LGLYSqQErZOte5cwqJANIS/VK3SfleX4G\n33zmaP7SOOSw23X6I4gHXtXZRwPi8Fhoa/+fAZD3opd+vTYa9Vd89uvE+5ICDUM5\n7k0oxiIlDQKBgQCoWwtI4pug9M2ljhYmt45NFxBca+E8yoWWqpbrOaDfZVdZUoiX\n1euWaaSiZdFPc/P2yb8m6tujSrWgMh4/RlyPRbKAW7wd3mfElUeT5TWvnsUzXKp2\n0odmcK5OlkONR8fn5yd+n6DNKWyGyTWEbm8Fubq6pkmEBRgWzpLl3szafQKBgDU2\nFkqqDic1FSPjgybd6qGlGJ3VF120tBVwKwyMJF7kz2fkmCLN+CshhNIZjIHOsIQy\nSovDxqMYAVOCsqD3VUOj8L+l+O7M4DOvDieWWK4j2/HBdZ55FncXMKAdxHj5/odG\nFKe4XpXk/xKmvQSPHHCOqaRtZ0TSnEP7kC/hRLvJAoGAfFZRHz5qvejgWGZ2YijE\nblRR5fK7ZsIgXzmlmiHvv1r12aprLlYqBycVm79m4K2EmTEnSSIbhzrUn5OyjYTj\n67m/n6lGcviMjTunTHYIELCGb0rzKAzLlSiJar6tSH3LZck2aS+e+gPKLjgchcOy\ngFVJGjGjlzcm/fUbhwnzMSA=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-de1h8@fakebook-chat.iam.gserviceaccount.com",
        "client_id": "107559678607764698354",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-de1h8%40fakebook-chat.iam.gserviceaccount.com"
    }
    )
})
export default admin